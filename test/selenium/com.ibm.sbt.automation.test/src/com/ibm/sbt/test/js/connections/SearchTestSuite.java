/*
 * � Copyright IBM Corp. 2013
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
package com.ibm.sbt.test.js.connections;

import org.junit.AfterClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.ibm.sbt.test.js.connections.search.PeopleSearch;
import com.ibm.sbt.test.js.connections.search.api.GetApplications;
import com.ibm.sbt.test.js.connections.search.api.GetDates;
import com.ibm.sbt.test.js.connections.search.api.GetMyApplications;
import com.ibm.sbt.test.js.connections.search.api.GetMyDates;
import com.ibm.sbt.test.js.connections.search.api.GetMyPeople;
import com.ibm.sbt.test.js.connections.search.api.GetMyResults;
import com.ibm.sbt.test.js.connections.search.api.GetMyTags;
import com.ibm.sbt.test.js.connections.search.api.GetPeople;
import com.ibm.sbt.test.js.connections.search.api.GetResults;
import com.ibm.sbt.test.js.connections.search.api.GetTags;

/**
 * @author mwallace
 * 
 * @date 6 Mar 2013
 */
@RunWith(Suite.class)
@SuiteClasses({ PeopleSearch.class, GetApplications.class, GetDates.class,
		GetMyApplications.class, GetMyDates.class, GetMyPeople.class,
		GetMyResults.class, GetMyTags.class, GetPeople.class, GetResults.class,
		GetTags.class })
public class SearchTestSuite {
	@AfterClass
	public static void cleanup() {
	}
}
