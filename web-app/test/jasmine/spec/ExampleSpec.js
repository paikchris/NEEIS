var fixture;

//******************************************************************************************
//THIS FUNCTION LOADS NEW SUBMISSION HTML PAGE INTO THE TEST, SO WE CAN TEST ON IT
//******************************************************************************************
function resetNewSubmission(done){
    $("#fixtureToBeTested").load("./../main/newSubmission #page-content-wrapper", function () {
        //TURN OFF JQUERY ANIMATIONS
        $.fx.off = true;

        //Turn off Autosave Loading
        Cookies.remove('autosaveData');

        //APPEND THE HTML TO THE APPROPRIATE FIXTURE DIV
        $("#fixtureToBeTested").html($(this).find('#page-content-wrapper').html());

        //LOAD NECESSARY JS FILES FOR TEST PAGE
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.onload = function(){
            done();
        };
        script.src = '/js/newSubmission.js'+"?ts=" + new Date().getTime();
        head.appendChild(script);
    });

    fixture = $('#fixtureToBeTested');
}


//******************************************************************************************
//'describe' IS A CATEGORY OF TESTS. WRITE A DESCRIPTION OF WHAT THE GROUP OF TESTS INSIDE IS TESTING
//******************************************************************************************
describe('DESCRIPTION', function() {

      //******************************************************************************************
      //'it' IS A INDIVIDUAL TEST.
      //******************************************************************************************
      it('Test1', function() {

          //******************************************************************************************
          //'expect' IS SOMETHING YOU EXPECT TO HAPPEN OR BE TRUE
          //******************************************************************************************
          expect(true).toBe(true);
          expect(false).toBe(false);
          expect(false).not.toBe(true);
      });
});

//******************************************************************************************
//BASIC TESTS FOR NEW SUBMISSION
//******************************************************************************************
describe('TESTING A CLICK, OR HAVING THE TEST CLICK AN ELEMENT', function() {
    //******************************************************************************************
    //LOADING THE NEW SUBMISSION PAGE
    //******************************************************************************************
    jasmine.getFixtures().fixturesPath = 'http://104.236.23.128:8080/test/jasmine/spec/fixtures/javascripts';
    //JUST MEANS TO RUN THIS FUNCTION BEFORE THE START OF THE TEST
    beforeAll(function (done) {
        resetNewSubmission(done);
    });

    //******************************************************************************************
    //TESTING CLICKS
    //******************************************************************************************
    it("CHECKING TO SEE IF SOMETHING IS CLICKED", function() {
        //SPY OR WATCH AN ELEMENT '.riskOptionLink', for a 'click' (can watch for 'change' also)
        spyOnEvent('.riskOptionLink', 'click');
        expect('click').toHaveBeenTriggeredOn('.riskOptionLink');
    });

    //******************************************************************************************
    //USUALLY CLICKING LOADS SOMETHING OR CHANGES SOMETHING ON THE PAGE
    //THIS IS A WAY TO WAIT UNTIL THE CHANGE LOADS TO CONTINUE THE TEST
    //******************************************************************************************
    it("WAIT UNTIL CHANGE LOADS", function(done) { // keep note of this 'done' thing
        //FIRST IS USUALLY A CLICK OR CHANGE ON SOMETHING
        spyOnEvent('.riskOptionLink', 'click');
        expect('click').toHaveBeenTriggeredOn('.riskOptionLink');


        //WAITING STUFF
        var POLL_TIME = 10;// HOW OFTEN IN MILLISECONDS I SHOULD CHECK IF PAGE IS READY
        var endTime = new Date().getTime() + 5000; // MAX TIME IT SHOULD WAIT FOR CHANGE, IF IT TAKES TOO LONG IT WILL ERROR
        var checkCondition = function() {
            if ($('#proposedEffectiveDate').is(':visible') === false) { //IF 'proposedEffectiveDate' IS NOT VISIBLE, KEEP WAITING
                //console.log("waiting to load products");
                setTimeout(checkCondition, POLL_TIME);
            }
            else { //CODE TO RUN AFTER CHANGE IS COMPLETED. NOW YOU CAN TEST WHAT YOU EXPECT.
                expect('#PIPChoiceInputRadio').toBeInDOM();
                done(); //*IMPORTANT* NEED TO CALL DONE() SO THE TEST KNOWS WHATEVER YOU WERE WAITING FOR IS DONE
            }
        };
        checkCondition();
    });




});



//******************************************************************************************
//LIST OF MATCHER AVAILABLE TO BE USED
//******************************************************************************************
describe('LIST OF MATCHERS', function() {
      it("The 'toBe' matcher compares with ===", function() {
          var a = 12;
          var b = a;

          expect(a).toBe(b);
          expect(a).not.toBe(null);
      });
      it("works for simple literals and variables", function() {
          var a = 12;
          expect(a).toEqual(12);
      });

      it("The 'toBeDefined' matcher compares against `undefined`", function() {
          var a = {
              foo: "foo"
          };

          expect(a.foo).toBeDefined();
          expect(a.bar).not.toBeDefined();
      });

      it("The 'toBeNull' matcher compares against null", function() {
          var a = null;
          var foo = "foo";

          expect(null).toBeNull();
          expect(a).toBeNull();
          expect(foo).not.toBeNull();
      });

      it("works for finding an item in an Array", function() {
          var a = ["foo", "bar", "baz"];

          expect(a).toContain("bar");
          expect(a).not.toContain("quux");
      });

      it("also works for finding a substring", function() {
          var a = "foo bar baz";

          expect(a).toContain("bar");
          expect(a).not.toContain("quux");
      });

      it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
          var pi = 3.1415926,
          e = 2.78;

          expect(e).toBeLessThan(pi);
          expect(pi).not.toBeLessThan(e);
      });

      it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
          var pi = 3.1415926,
          e = 2.78;

          expect(pi).not.toBeCloseTo(e, 2);
          expect(pi).toBeCloseTo(e, 0);
      });

      it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
          var foo = function() {
              return 1 + 2;
          };
          var bar = function() {
              return a + 1;
          };
          var baz = function() {
              throw 'what';
          };

          expect(foo).not.toThrow();
          expect(bar).toThrow();
          expect(baz).toThrow('what');
      });

      it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
          var foo = function() {
              throw new TypeError("foo bar baz");
          };

          expect(foo).toThrowError("foo bar baz");
          expect(foo).toThrowError(/bar/);
          expect(foo).toThrowError(TypeError);
          expect(foo).toThrowError(TypeError, "foo bar baz");
      });


      /*
        toBeChecked()
        only for tags that have checked attribute
        e.g. expect($('<input type="checkbox" checked="checked"/>')).toBeChecked()
        toBeDisabled()
        e.g. expect('<input type="submit" disabled="disabled"/>').toBeDisabled()
        toBeEmpty()
        Checks for child DOM elements or text.
        toBeFocused()
        e.g. expect($('<input type="text" />').focus()).toBeFocused()
        toBeHidden() Elements can be considered hidden for several reasons:
        They have a CSS display value of none.
        They are form elements with type equal to hidden.
        Their width and height are explicitly set to 0.
        An ancestor element is hidden, so the element is not shown on the page.
        toBeInDOM()
        Checks to see if the matched element is attached to the DOM
        e.g. expect($('#id-name')[0]).toBeInDOM()
        toBeMatchedBy(jQuerySelector)
        Check to see if the set of matched elements matches the given selector
        e.g. expect($('<span></span>').addClass('js-something')).toBeMatchedBy('.js-something')
        true if the dom contains the element
        toBeSelected()
        only for tags that have selected attribute
        e.g. expect($('<option selected="selected"></option>')).toBeSelected()
        toBeVisible()
        Elements are considered visible if they consume space in the document. Visible elements have a width or height that is greater than zero.
        toContain(string)
        e.g. expect($('<div><span class="some-class"></span></div>')).toContain('some-class')
        toContainElement(jQuerySelector)
        e.g. expect($('<div><span class="some-class"></span></div>')).toContainElement('span.some-class')
        toContainHtml(string)
        e.g. expect($('<div><ul></ul><h1>header</h1></div>')).toContainHtml('<ul></ul>')
        toContainText(string)
        e.g. expect($('<div><ul></ul><h1>header</h1></div>')).toContainText('header')
        toEqual(jQuerySelector)
        e.g. expect($('<div id="some-id"></div>')).toEqual('div')
        e.g. expect($('<div id="some-id"></div>')).toEqual('div#some-id')
        toExist()
        true if element exists in or out of the dom
        toHandle(eventName)
        e.g. expect($form).toHandle("submit")
        toHandleWith(eventName, eventHandler)
        e.g. expect($form).toHandleWith("submit", yourSubmitCallback)
        toHaveAttr(attributeName, attributeValue)
        attribute value is optional, if omitted it will check only if attribute exists
        toHaveBeenTriggeredOn(selector)
        if event has been triggered on selector (see "Event Spies", below)
        toHaveBeenTriggered()
        if event has been triggered on selector (see "Event Spies", below)
        toHaveBeenTriggeredOnAndWith(selector, extraParameters)
        if event has been triggered on selector and with extraParameters
        toHaveBeenPreventedOn(selector)
        if event has been prevented on selector (see "Event Spies", below)
        toHaveBeenPrevented()
        if event has been prevented on selector (see "Event Spies", below)
        toHaveClass(className)
        e.g. expect($('<div class="some-class"></div>')).toHaveClass("some-class")
        toHaveCss(css)
        e.g. expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({display: "none", margin: "10px"})
        e.g. expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({margin: "10px"})
        toHaveData(key, value)
        value is optional, if omitted it will check only if an entry for that key exists
        toHaveHtml(string)
        e.g. expect($('<div><span></span></div>')).toHaveHtml('<span></span>')
        toHaveId(id)
        e.g. expect($('<div id="some-id"></div>')).toHaveId("some-id")
        toHaveLength(value)
        e.g. expect($('ul > li')).toHaveLength(3)
        toHaveProp(propertyName, propertyValue)
        property value is optional, if omitted it will check only if property exists
        toHaveText(string)
        accepts a String or regular expression
        e.g. expect($('<div>some text</div>')).toHaveText('some text')
        toHaveValue(value)
        only for elements on which val can be called (input, textarea, etc)
        e.g. expect($('<input type="text" value="some text"/>')).toHaveValue('some text')
      */


});
