import React from "react";
import PickerCascader from "../index";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeAll } from "@jest/globals";


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



beforeAll(() => {
  const spyFunc = jest.fn();
  Object.defineProperty(global, "document", { value: spyFunc });
  const sypEventHandler = jest.fn();
  global.document.addEventListener = sypEventHandler;
  global.document.createElement = jest.fn();
});

describe("test render", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <PickerCascader data={pcData} onValueSelected={item => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
    const { container } = render(
      <PickerCascader data={pcData} onValueSelected={item => done()} />
    );
  });
});

it("verify items selection and parent navigation", done => {
  const { getByText, container } = render(
    <PickerCascader data={pcData} onValueSelected={item => done()} />
  );

  const dropdown = container.querySelector(".pc-text-panel");
  fireEvent.click(dropdown);

  const ausElem = getByText("Australia");
  expect(ausElem).toBeTruthy();

  fireEvent.click(ausElem);

  const nswElem = getByText("New South Wales");
  expect(nswElem).toBeTruthy();

  fireEvent.click(nswElem);

  const sydElem = getByText("Sydney");
  expect(sydElem).toBeTruthy();

  const pausElem = getByText("Australia");
  expect(pausElem).toBeTruthy();

  fireEvent.click(pausElem);

  const canElem = getByText("Canada");
  expect(canElem).toBeTruthy();

  fireEvent.click(canElem);

  const alElem = getByText("Alberta");
  expect(alElem).toBeTruthy();

  fireEvent.click(alElem);

  const calElem = getByText("Calgary");
  expect(calElem).toBeTruthy();

  fireEvent.click(calElem);

  const text = getByText("Canada | Alberta | Calgary");
  expect(text).toBeTruthy();
});

it("verify search", done => {
  const { getByText, getByTestId, container } = render(
    <PickerCascader data={pcData} onValueSelected={item => done()} />
  );

  const dropdown = container.querySelector(".pc-text-panel");
  fireEvent.click(dropdown);

  const searchElem = getByTestId("pc-search-field");
  fireEvent.change(searchElem, { target: { value: "sydney" } });

  const text = getByText("Australia | New South Wales | Sydney");
  expect(text).toBeTruthy();

  fireEvent.click(text);
});
