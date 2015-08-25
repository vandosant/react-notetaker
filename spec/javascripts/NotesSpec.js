import Notes from '../../app/components/Notes/Notes.js'
import React from 'react/addons';
var TestUtils = React.addons.TestUtils;

describe('Notes', () => {
  var component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Notes username="Ray Kurzweil" notes={[]} addNote={() => {}}/>);
  });

  it('should display the correct user name', () => {
    component = React.findDOMNode(component)
    expect(component.textContent).toMatch(/Ray Kurzweil/);
  });
});