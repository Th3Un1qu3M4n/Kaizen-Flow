/* eslint-disable */
import { useEffect, useState } from "react";
// import "./styles.css";

const data = {
  value: "root",
  label: "root",
  isSelected: false,
  isDisabled: false,
  isCollapsed: false,
  children: [
    {
      label: "Level A1",
      value: "Level A1",
      isSelected: false,
      isDisabled: false,
      isCollapsed: false,
      children: [
        {
          label: "Level B1",
          value: "Level B1",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Level C1",
              value: "Level C1",
              isSelected: false,
              isDisabled: true,
              isCollapsed: false,
              children: [
                {
                  label: "Level D1",
                  value: "Level D1",
                  isSelected: false,
                  isDisabled: false,
                  isCollapsed: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Level B2",
          value: "Level B2",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Level C2",
              value: "Level C2",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: [
                {
                  label: "Level D2",
                  value: "Level D2",
                  isSelected: false,
                  isDisabled: false,
                  isCollapsed: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Level A3",
      value: "Level A3",
      isSelected: false,
      isDisabled: false,
      isCollapsed: false,
      children: [
        {
          label: "Level B3",
          value: "Level B3",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Level 3",
              value: "Level 3",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: [
                {
                  label: "Level D3",
                  value: "Level D3",
                  isSelected: false,
                  isDisabled: false,
                  isCollapsed: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Level B4",
          value: "Level B4",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Level C4",
              value: "Level C4",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: [
                {
                  label: "Level D4",
                  value: "Level D4",
                  isSelected: false,
                  isDisabled: false,
                  isCollapsed: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

function traverseAndToggleNode(
  data,
  value,
  key
) {
  let toggled = false;

  if (data) {
    data.forEach((node) => {
      if (node.value === value) {
        node[key] = !node[key];
        toggled = true;
      }
    });

    if (!toggled) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { data: newChildren, toggled } = traverseAndToggleNode(
          node.children,
          value
        );
        if (toggled) {
          node.children = newChildren;
          break;
        }
      }
    }
  }
  return { data, toggled };
}

function toggleNodeSelected(value , setData ) {
  setData((data ) => {
    const { data: newChildren, toggled } = traverseAndToggleNode(
      data.children,
      value
    );
    const newData = { ...data, children: newChildren };
    return newData;
  });
}

function setAllChildren(node , value ) {
  let flat  = getFlattedChildren(node);

  flat.forEach((child ) => {
    child.isSelected = value;
  });
}

function traverseAndToggleNodeChildren(data , value ) {
  let toggled = false;
  data.forEach((node) => {
    if (node.value === value) {
      toggled = true;
      let newValue = true;
      // If all selected, change them to false
      if (isAllSelected(node)) {
        newValue = false;
      }

      node.isSelected = newValue;
      setAllChildren(node, newValue);
    }
  });

  if (!toggled) {
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      const { data: newChildren, toggled } = traverseAndToggleNodeChildren(
        node.children,
        value
      );
      node.children = newChildren;
      if (toggled) {
        break;
      }
    }
  }

  return { data, toggled };
}

function toggleAllChildren(value , setData ) {
  setData((data ) => {
    const { data: newChildren } = traverseAndToggleNodeChildren(
      data.children,
      value
    );
    const newData = { ...data, children: newChildren };
    return newData;
  });
}

export function CheckItem({
  node,
  setData
}) {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%"
          // border: "1px solid red"
        }}
      >
        <label style={{ color: node.isDisabled ? "gray" : "white" }}>
        <input
            type="checkbox"
            style={{accentColor: "green", backgroundColor:"transparent"}}
            disabled={node.isDisabled}
            onChange={() => toggleAllChildren(node.value, setData)}
            checked={isAllSelected(node)}
          />
          {/* <input
            type="checkbox"
            checked={node.isSelected}
            // checked={isAllSelected(node)}
            disabled={node.isDisabled}
            onChange={(evt) => {
              toggleNodeSelected(node.value, setData);
            }}
            
          /> */}
         
          <span style={node.isHeading?{
            marginLeft: "10px",
            fontSize:" 14px",
            fontWeight: "700",
            lineHeight: "24px",
            letterSpacing: "0em",
            textAlign: "left",
            }:
            {
                marginLeft: "10px",
                fontSize:" 12px",
                fontWeight: "400",
                lineHeight: "16px",
                letterSpacing: "0em",
                textAlign: "left",
    
              }}>{node.label}</span>
                </label>
        {/* <div>
          <input
            type="checkbox"
            disabled={node.isDisabled}
            onChange={() => toggleAllChildren(node.value, setData)}
            checked={isAllSelected(node)}
          />
        </div> */}
      </div>
      <div style={{ paddingLeft: "16px", paddingTop: "8px" }}>
        <NestedChecklist data={node.children} setData={setData} />
      </div>
    </div>
  );
}

export function getSelectedValues(data )  {
  


  return [];
}
export function NestedChecklist({
  data,
  setData
}) {
  return (
    <>
      {data.map((node) => (
        <CheckItem node={node} setData={setData} />
      ))}
    </>
  );
}

function isAllSelected(node) {
  let allSelected = true;

  let flat = getFlattedChildren(node);

  flat.forEach((child) => {
    if (!child.isSelected) {
      allSelected = false;
    }
  });

  return allSelected;
}

function getFlattedChildren(node) {
  let flat = [node];
  node.children.forEach((child) => {
    flat = [...flat, ...getFlattedChildren(child)];
  });
  return flat;
}

export default function App() {
  const [checklistData, setChecklistData] = useState<Node>(data);
  const allSelected = isAllSelected(checklistData);
//   console.log("allSelected: ", allSelected);

  useEffect(() => {
    const nodes = getFlattedChildren(checklistData);
    const selected = []
    nodes.forEach((node) => {
      if (node.isSelected) {
        selected.push(node.value);
      }
    })
    console.log('These are the selected nodes: ', selected)
    // Here is where you would call an onSelect callback with these values
  }, [checklistData])
  return (
    <div className="App" style={{ width: "180px" }}>
      <div style={{ display: "flex", paddingBottom: "16px" }}>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => {
              setChecklistData((data) => {
                const flat = getFlattedChildren(data);
                flat.forEach((node) => {
                  node.isSelected = !allSelected;
                });
                return { ...data };
              });
            }}
          />
          <span>{allSelected ? "Deselect all" : "Select All"}</span>
        </label>
      </div>
      <NestedChecklist
        data={checklistData.children}
        setData={setChecklistData}
      />
    </div>
  );
}
