/*
 * © Copyright IBM Corp. 2013
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
package com.ibm.sbt.test.js.smartcloud.profiles;

import java.util.ArrayList;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import com.ibm.commons.util.io.json.JsonJavaObject;
import com.ibm.sbt.automation.core.test.BaseApiTest;
import com.ibm.sbt.automation.core.test.pageobjects.JavaScriptPreviewPage;

/**
 * @author Vimal Dhupar
 *  
 * @date 10th June, 2013
 */
public class ProfileEntryJsonDataHandler extends BaseApiTest {
    
    static final String SNIPPET_ID = "Social_Profiles_SmartCloud_API_ProfileEntryJsonDataHandler";

    @Test
    public void testProfileEntryJsonDataHandler() {
        JavaScriptPreviewPage previewPage = executeSnippet(SNIPPET_ID);
        JsonJavaObject json = previewPage.getJson();
        
        Assert.assertEquals("na.collabserv.com:user:20547574", json.getString("entityId"));
        
        Assert.assertEquals("Sales Executive", json.getString("title")); 
        Assert.assertEquals("https://apps.na.collabserv.com/contacts/profiles/view/20547574", json.getString("profileUrl"));
        Assert.assertEquals("Frank Adams", json.getString("name"));
        
        
        Assert.assertEquals(true, json.getBoolean("thumbnailUrlB"));
        Assert.assertEquals(true, json.getBoolean("emailB"));
        Assert.assertEquals(true, json.getBoolean("addressB"));
        
        Assert.assertEquals(45609, json.getInt("phoneNumber"));
        Assert.assertEquals(20542369, json.getInt("organisationIdN"));
        
        ArrayList jArray = new ArrayList();
        jArray.add("IBM Test - SDK Renovations");
        Assert.assertEquals(jArray, (List)json.get("departmentA"));
        jArray.clear();
        jArray.add("US");
        Assert.assertEquals(jArray, (List)json.get("countryA"));
        jArray.clear();
        jArray.add("Sales Executive IBM Collaboration Software");
        Assert.assertEquals(jArray, (List)json.get("aboutA"));
    }
    
}
