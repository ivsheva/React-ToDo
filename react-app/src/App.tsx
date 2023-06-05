import { useState, ChangeEvent, KeyboardEvent } from "react";
import Heading from "./Components/Heading/Heading";
import Button from "./Components/Button/Button";
import ListGroup from "./Components/ListGroup/ListGroup";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("" as string); //specify the data type
  const [listItems, setListItems] = useState<string[]>([]);

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleClick() {
    inputValue
      ? setListItems([...listItems, inputValue])
      : setListItems(listItems);
    setInputValue("");
  }

  function handleDeleteItem(index: number) {
    const updatedListItems = listItems.filter((_item, idx) => idx !== index);
    setListItems(updatedListItems);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  return (
    <div>
      <Heading />
      <input
        className="input-group"
        type="text"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        placeholder="What needs to be done?"
        style={{ height: "40px" }}
      />
      <Button onClick={handleClick} />
      <ListGroup
        setItems={setListItems}
        items={listItems}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default App;
