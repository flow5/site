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
	
	function Home() {
		this.getNavConfig = function () {
			return {
				left: null
			};
		};	
		
	}
	
	function Packages() {
		//		this.devoverlay = true;
		
		// TODO: f5 block for the navconfig title
		this.getNavConfig = function () {
			return {
				title: 'Showcase'
			};
		};	
		
		this.viewDidBecomeActive = function () {
			var that = this;
			if (this.node.flowDelegate.refreshModel(function errCb() {
				F5.stopActivity(that.el);
				F5.alert('Something went wrong', 'Please try again later.');
			})) {
				F5.startActivity(this.el);
			}
		};
		
		this.modelChanged = function () {
			var that = this;
			F5.stopActivity(this.el);
			F5.populateList(this.widgets.list, 'packageItem', this.node, this.node.data.packages, 
				function (item, el, widgets) {
					widgets.control.setAction(function () {												
						if (item.pkg) {
							var pkg;
							// fully qualifed package
							if (item.pkg.split('.').length > 1) {
								pkg = item.pkg;
							} else {
							// site relative package
								pkg = F5.appPkg + '.' + item.pkg;								
							}
							F5.Global.flowController.doTransition(that.node, 'packageViewer', {pkg: pkg, url: item.url});						
						}
					});
				}
			) ;			
		};					
	}

	function PackageViewer() {
		this.getNavConfig = function () {
			return {
				title: this.node.data.pkg,
				left: {
					label: 'Back',
					transition: 'back'
				}
			};
		};
		
		this.viewDidBecomeInactive = function () {
			F5.Global.flowController.deleteNode(this.node.children[this.node.data.pkg]);
		};	
		
		this.viewDidBecomeActive = function () {
			var that = this;
			var pkg = this.node.data.pkg;
			F5.importPackage(pkg, function () {
				F5.Global.flowController.importNode(pkg, {
						active: true,
						children:{
							root: F5.valueFromId(F5.Flows, pkg)
						}
					}, that.node, pkg, function () {
						console.log('imported');
					});			
			},this.node.data.url);			
		};
	}		

	
	function Settings() {
		
	}		

	F5.Prototypes.ViewDelegates.home = new Home();	
	F5.Prototypes.ViewDelegates.packages = new Packages();	
	F5.Prototypes.ViewDelegates.packageViewer = new PackageViewer();	
	F5.Prototypes.ViewDelegates.settings = new Settings();	
});