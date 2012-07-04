/***********************************************************************************************************************

	Copyright (c) 2012 Paul Greyson

	Permission is hereby granted, free of charge, to any person 
	obtaining a copy of this software and associated documentation 
	files (the "Software"), to deal in the Software without 
	restriction, including without limitation the rights to use, 
	copy, modify, merge, publish, distribute, sublicense, and/or 
	sell copies of the Software, and to permit persons to whom the 
	Software is furnished to do so, subject to the following 
	conditions:

	The above copyright notice and this permission notice shall be 
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
	OTHER DEALINGS IN THE SOFTWARE.

***********************************************************************************************************************/
/*global F5, Demo*/

F5.registerModule(function (F5) {

	function Packages() {
		this.refreshModel = function (errCb) {
			var that = this;
			if (!that.node.data.packages) {
				F5.execService(this.node, 'flow5.packages', {}, function (packages, status) {
					if (status === 200) {
						that.node.data.packages = packages;
						that.node.data.modelChanged();
					} else {
						errCb(status);
					}
				});
				return true;
			}
		};
	}
	
	function Settings() {
		this.initialize = function () {

		};
	}

	F5.Prototypes.FlowDelegates.packages = new Packages();	
	F5.Prototypes.FlowDelegates.settings = new Settings();	
});