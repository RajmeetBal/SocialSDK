/*
 * � Copyright IBM Corp. 2014
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
package com.ibm.sbt.services.client.smartcloud.bss;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.ibm.commons.util.StringUtil;
import com.ibm.commons.util.io.json.JsonJavaObject;
import com.ibm.sbt.services.client.base.JsonEntity;

/**
 * @author mwallace
 *
 */
public class RevokeStorageSubscriptionTest extends BaseBssTest {

    @Test
    public void testRevokeSubscription() {
    	try {
    		// Step 1. Create customer
    		String customerId = registerCustomer();
    		
    		this.customerId = null;
    		
    		// prevent deletion
    		setCustomerId(null);

    		// Step 2. Add Subscriber
			String subscriberId = addAdministrator(customerId);
    		JsonEntity administrator = getSubscriberById(subscriberId);
    		System.out.println(administrator.toJsonString());
    		String loginName = administrator.getAsString("Subscriber/Person/EmailAddress");
    		setPassword(loginName, "onet1me!", "passw0rd");
    		System.out.println(loginName);

    		// Step 3. Create "IBM SmartCloud Connections" Subscription
    		String engageSubscriptionId = createSubscription(customerId, 3, "D0NWLLL", 5);
    		System.out.println(engageSubscriptionId);
    		System.out.println("D0NWLLL : " + getSubscriptionById(engageSubscriptionId).toJsonString());

    		// Step 4. Create Extra Storage Subscription
    		String storageSubscriptionId = createSubscription(customerId, 3, "D100PLL", 100);
    		System.out.println(storageSubscriptionId);
    		System.out.println("D100PLL : " + getSubscriptionById(storageSubscriptionId).toJsonString());

    		// Step 5. Activate the subscriber
    		activateSubscriber(subscriberId);
    		
    		// Step 8. Entitle subscriber
    		entitleSubscriber(subscriberId, engageSubscriptionId, true);
    		entitleSubscriber(subscriberId, storageSubscriptionId, true);
    		
    		// Optional: Check seats
    		JsonEntity jsonEntity = getSubscriberManagementService().getSubscriberById(subscriberId);
    		JsonJavaObject rootObject = jsonEntity.getJsonObject();
    		JsonJavaObject subscriberObject = rootObject.getAsObject("Subscriber");
			List<Object> seatSet = subscriberObject.getAsList("SeatSet");
    		for (Object seat : seatSet) {
    			System.out.println(seat);
    		}
    		
    		// Step 8. Retrieve a seat
    		JsonJavaObject seatJson = findSeat(subscriberId, storageSubscriptionId);
    		String seatId = String.valueOf(seatJson.getAsObject("Seat").getAsLong("Id"));

    		// Step 9. Revoke subscriber subscription
    		getSubscriberManagementService().revokeSubscriber(subscriberId, seatId, true);
    		
    		// Optional: Check seats
    		jsonEntity = getSubscriberManagementService().getSubscriberById(subscriberId);
    		rootObject = jsonEntity.getJsonObject();
    		subscriberObject = rootObject.getAsObject("Subscriber");
			seatSet = subscriberObject.getAsList("SeatSet");
    		for (Object seat : seatSet) {
    			System.out.println(seat);
    		}
    		
    	} catch (Exception e) {
    		e.printStackTrace();
    		Assert.fail("Error revoking subscription caused by: "+e.getMessage());    		
    	}
    }
	
    @Test
    public void testRevokeSubscriptions() {
    	try {
    		String customerId = System.getProperty("customerId");
    		String subscriberId = System.getProperty("subscriberId");

    		/*
    		String storageSubscriptionId = createSubscription(customerId, 3, "D100PLL", 100);
    		System.out.println(storageSubscriptionId);
    		System.out.println("D100PLL : " + getSubscriptionById(storageSubscriptionId).toJsonString());

    		entitleSubscriber(subscriberId, storageSubscriptionId, true);
    		*/
    		
    		// Revoke subscriptions
    		JsonEntity jsonEntity = getSubscriberManagementService().getSubscriberById(subscriberId);
    		JsonJavaObject rootObject = jsonEntity.getJsonObject();
    		JsonJavaObject subscriberObject = rootObject.getAsObject("Subscriber");
			List<Object> seatSet = subscriberObject.getAsList("SeatSet");
    		for (Object seat : seatSet) {
    			System.out.println(seat);
    			JsonJavaObject seatJson = (JsonJavaObject)seat;
    			String seatId = String.valueOf(seatJson.getAsLong("Id"));
    			String subscriptionId = String.valueOf(seatJson.getAsLong("SubscriptionId"));

        		getSubscriberManagementService().revokeSubscriber(subscriberId, seatId, true);
    		}
    		
    		// Optional: Check seats
    		jsonEntity = getSubscriberManagementService().getSubscriberById(subscriberId);
    		rootObject = jsonEntity.getJsonObject();
    		subscriberObject = rootObject.getAsObject("Subscriber");
			seatSet = subscriberObject.getAsList("SeatSet");
    		for (Object seat : seatSet) {
    			System.out.println(seat);
    		}
    		
    	} catch (Exception e) {
    		e.printStackTrace();
    		Assert.fail("Error revoking subscription caused by: "+e.getMessage());    		
    	}
    }

}
