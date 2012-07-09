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
/*global F5*/

F5.registerModule(function (F5) {
	
	function Flow5_Buttons() {
		
		this.initialize = function () {
			this.widgets.simpleButton.setAction(function () {
				F5.alert('Press', 'Simple Button');
			});
			this.widgets.maskButton.setAction(function () {
				F5.alert('Press', 'Mask Button');
			});
//			this.widgets.imageButton.setAction(function () {
//				F5.alert('Press', 'Image Button');
//			});
			this.widgets.stretchyButton.setAction(function () {
				F5.alert('Press', 'Stretchy Button');
			});
		};		
	}
	
	function Scroller() {
		this.viewDidBecomeActive = function () {
			this.node.flowDelegate.refresh();
		};
		
		this.modelChanged = function () {
			F5.populateList(this.listEl, 'scrollerItem', this.node, this.node.data.list);			
			this.refreshScroller();
		};
	}
	
	function Flow5_Scroller() {
		this.initialize = function () {
			this.listEl = this.widgets.list.el;
		};
		
		this.refreshScroller = function () {
			this.widgets.list.refresh();
		};
	}
	Flow5_Scroller.prototype = new Scroller();
	
	function IScroll_Scroller() {
		this.initialize = function () {
			this.listEl = F5.getElementById(this.el, 'list');
			/*global iScroll*/
			var IScroll = iScroll;
			this.list = new IScroll(this.listEl, {desktopCompatibility:true});
		};
					
		this.refreshScroller = function () {
			this.list.refresh();
		};
	}
	IScroll_Scroller.prototype = new Scroller();
		
	F5.Prototypes.ViewDelegates.flow5_buttons = new Flow5_Buttons();
	F5.Prototypes.ViewDelegates.flow5_scroller = new Flow5_Scroller();
	F5.Prototypes.ViewDelegates.iscroll = new IScroll_Scroller();
	
});