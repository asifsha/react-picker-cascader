import React, { useState, useEffect } from "react";
import { FaCaretDown, FaCaretRight, FaCaretUp, FaSearch } from "react-icons/fa";

import "./pickerCascader.css";

export function PickerCascader(props) {
  const [showList, setShowList] = useState(false);

  const [displayList, setDisplayList] = useState(props.data);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(undefined);

  const [selectedItems, setSelectedItems] = useState([]);

  const [historyItems, setHistoryItems] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [searchData, setSearchData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  const togglePicker = () => {
    if (isPickerOpen) {
      setDisplayList(props.data);
      setHistoryItems([]);
    } else {
      setSelectedItems([]);
    }
    setIsPickerOpen(!isPickerOpen);
    setShowList(!showList);
  };  

  const onItemClicked = item => {
    if (
      item.children === undefined ||
      item.children === null ||
      item.children.length === 0
    ) {
      let index = 0;
      let t = "",
        k = "";

      for (index = 0; index < selectedItems.length; index++) {
        t = t + selectedItems[index].text + " | ";
        k = k + selectedItems[index].key + "~";
      }
      let si = { text: "", key: "" };
      si.text = t + item.text;
      si.key = k + item.key;

      if (props.onValueSelected !== undefined) {
        props.onValueSelected(si);
      }
      setSelectedItem(si);
      togglePicker();
      return;
    }
    setDisplayList(item.children);
    //setClickedItem(item);
    var lastselectedItems = selectedItems.slice();
    let h = {
      selectedItems: selectedItems.slice(),
      dispalyList: displayList.slice(),
      key: item.key,
      text: item.text
    };
    lastselectedItems.push(item);
    setSelectedItems(lastselectedItems.slice());

    setHistoryItems([...historyItems, h]);
  };

  const onHistoryItemClicked = historyItem => {
    setDisplayList(historyItem.dispalyList.slice());

    let lastHistory = historyItems;
    let pIndex = findIndexByKey(lastHistory, historyItem.key);

    lastHistory.length = pIndex;

    setSelectedItems(historyItem.selectedItems);
    setHistoryItems(lastHistory);
  };

  const findIndexByKey = (data, key) => {
    return data.findIndex(x => x.key === key);
  };

  const renderItems = () => {
    return (
      <div>
        {(searchValue === undefined || searchValue === "") && renderDataItems()}
        {searchValue !== "" && renderSearchItems()}
      </div>
    );
  };

  const renderSearchItems = () => {
    if (searchValue === undefined) return null;
    const searcItems = filterData.map((item, i) => {
      return (
        <div className="pc-list-card" style={{ display: "flex" }} key={i}>
          <div
            key={i}
            value={item.key}
            style={{ verticalAlign: "middle" }}
            onClick={() => {
              onSearchItemClicked(item);
            }}
          >
            {item.text}
          </div>
        </div>
      );
    });
    return <div>{searcItems}</div>;
  };

  const renderDataItems = () => {
    if (displayList === undefined || displayList.length === 0) return null;
    const listItems = displayList.map((item, i) => {
      return (
        <div className="pc-list-card" style={{ display: "flex" }} key={i}>
          <div
            key={i}
            value={item.key}
            style={{ verticalAlign: "middle" }}
            onClick={() => {
              onItemClicked(item);
            }}
          >
            {item.text} {item.children !== undefined ? <FaCaretRight /> : null}
          </div>
        </div>
      );
    });
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{listItems}</div>
        <br />
        <div>{renderHistoryItems()}</div>
      </div>
    );
  };

  const renderHistoryItems = () => {
    return (
      <div style={{ display: "flex" }}>
        {historyItems.map((item, i) => {
          return (
            <div
              key={i}
              value={item.key}
              className="pc-history-list"
              onClick={() => {
                onHistoryItemClicked(item);
              }}
            >
              {item.text}{" "}
              {i !== historyItems.length - 1 ? <FaCaretRight /> : null}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const createSearchData = (searchData, data, key, text) => {
      let index = 0;
      for (index = 0; index < data.length; index++) {
        let d = data[index];
        if (d.children !== undefined)
          createSearchData(
            searchData,
            d.children,
            key + d.key + "~",
            text + d.text + " | "
          );
        else {
          let k = key + d.key;
          let t = text + d.text;
          searchData.push({ key: k, text: t });
        }
      }
    };
    
    let td = [];
    createSearchData(td, props.data, "", "");
    setSearchData(td.slice());
  }, []);

  const onSearchItemClicked = item => {
    let si = { text: "", key: "" };
    si.text = item.text;
    si.key = item.key;
    setSelectedItem(si);
    togglePicker();
    if (props.onValueSelected != null) {
      props.onValueSelected(si);
    }
  };

  const handleSearch = event => {
    let searchString = event.target.value;
    setSearchValue(searchString);
    event.preventDefault();
    let sd = searchData.slice();
    sd = sd.filter(arr => {
      return arr.text.toLowerCase().includes(searchString.toLowerCase());
    });

    setFilterData(sd);
  };

  return (
    <div style={props.style}>
      <div
        className="pc-text-panel"
        onClick={() => togglePicker()}
        style={{ color: selectedItem !== undefined ? "black" : "grey" }}
      >
        {selectedItem !== undefined ? selectedItem.text : props.placeHolder}
        <span className="pc-dropdown-icon">
          {showList ? <FaCaretUp /> : <FaCaretDown />}
        </span>
      </div>
      <div className="pc-list-wrapper">
        {showList && (
          <div className="pc-list" style={{ width: props.style.width }}>
            <div className="pc-search-container">
              <div className="pc-icon">
                <FaSearch />{" "}
              </div>
              <input
                data-testid={"pc-search-field"}
                className="pc-search-field"
                type="text"
                value={searchValue}
                onChange={evt => handleSearch(evt)}
              />
            </div>
            {renderItems(displayList)}
          </div>
        )}
      </div>
    </div>
  );
}

PickerCascader.defaultProps = {
  style: {
    width: "20rem"
  }
};
