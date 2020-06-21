import React from "react";
import PickerCascader from "../index";
import { expect, it } from "@jest/globals";

import renderer from 'react-test-renderer'


const pcData = [
  {
    key: "1",
    text: "Australia",
    children: [
      {
        key: "2",
        text: "New South Wales",
        children: [
          { key: "3", text: "Sydney" },
          { key: "4", text: "Wollongong" }
        ]
      },
      {
        key: "5",
        text: "Victoria",
        children: [
          { key: "6", text: "Melbourne" },
          { key: "7", text: "Geelong" }
        ]
      }
    ]
  },
  {
    key: "10",
    text: "Canada",
    children: [
      {
        key: "11",
        text: "Alberta",
        children: [
          { key: "12", text: "Calgary" },
          { key: "13", text: "Brooks" }
        ]
      },
      {
        key: "14",
        text: "British Columbia",
        children: [
          { key: "15", text: "Vancouver" },
          { key: "16", text: "Vernon" }
        ]
      }
    ]
  },
  {
    key: "20",
    text: "United States",
    children: [
      {
        key: "21",
        text: "New York",
        children: [
          { key: "22", text: "Albany" },
          { key: "23", text: "Norwich" }
        ]
      },
      {
        key: "24",
        text: "Pennsylvania",
        children: [
          { key: "25", text: "Farrell" },
          { key: "26", text: "Parker" }
        ]
      }
    ]
  }
];

/*global done : true*/
it('renders correctly with data', () => {
  const tree = renderer.create(<PickerCascader data={pcData} onValueSelected={() => done()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly without data', () => {
  const tree = renderer.create(<PickerCascader data={[]} onValueSelected={() => done()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
