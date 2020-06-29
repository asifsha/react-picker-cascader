# react-picker-cascader

React Picker Cascader Dropdown

## Installation

```
npm install --save r-picker-cascader
```

## How to Use

```
import PickerCascader from "r-picker-cascader";

<PickerCascader
            style={{ width: "15rem" }}
            placeHolder={"City"}
            data={[
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
            ]}
            onValueSelected={item => setCity(item)}
          />
```

https://picker-cascader-demo.herokuapp.com

![demo](https://raw.githubusercontent.com/asifsha/r-cascader-demo/master/demo/demo.gif)

## props

| prop | Description |
| --- | --- |
| data | Datasource for control, JavaScript object, if you want to bind json use json.Parse() to convert to JS object |
| onValueSelected | Event, will give you selected item, key as '~' separated and values as \| separated |


## npm
https://www.npmjs.com/package/r-picker-cascader

## Developed By
Asif Sharif

## License
MIT

