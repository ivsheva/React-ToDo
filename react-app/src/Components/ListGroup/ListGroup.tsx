import { useState, KeyboardEvent } from "react";
import styles from "./ListGroup.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

interface Props {
  items: string[];
  onDeleteItem: (index: number) => void;
  setItems: (items: string[]) => void;
}

const ListGroup = ({ items, onDeleteItem, setItems }: Props) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  const [editedItems, setEditedItems] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  const [editedValues, setEditedValues] = useState<string[]>(
    Array(items.length).fill("")
  );

  const [prevValues, setPrevValues] = useState<string[]>(
    Array(items.length).fill("")
  );

  function handleCheckboxChange(index: number) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  }

  function deleteItem(index: number) {
    onDeleteItem(index);
  }

  function editItem(index: number) {
    const newEditedItems = [...editedItems];
    newEditedItems[index] = !newEditedItems[index];
    setEditedItems(newEditedItems);

    if (!editedItems[index]) {
      const newPrevValues = [...prevValues];
      newPrevValues[index] = items[index];
      setPrevValues(newPrevValues);

      const newEditedValues = [...editedValues];
      newEditedValues[index] = items[index];
      setEditedValues(newEditedValues);
    } else {
      handleSave(index);
    }
  }

  function handleSave(index: number) {
    const editedValue = editedValues[index].trim();
    if (editedValue === "") {
      deleteItem(index); // Удаление элемента, если значение пустое
    } else {
      const newItems = [...items];
      newItems[index] = editedValue;
      setItems(newItems); // Перезаписываем значение items

      const newEditedItems = [...editedItems];
      newEditedItems[index] = !newEditedItems[index];
      setEditedItems(newEditedItems); // Обновляем состояние редактируется ли item?

      const newEditedValues = [...editedValues];
      newEditedValues[index] = ""; // Сброс значения editedValues
      setEditedValues(newEditedValues);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const newEditedValues = [...editedValues];
    newEditedValues[index] = event.target.value;
    setEditedValues(newEditedValues);
  }

  function handleKeyPress(event: KeyboardEvent, index: number) {
    if (event.key === "Enter") {
      handleSave(index);
    }
  }

  return (
    <div className={styles.wrapper}>
      <ul className="list-group">
        {items.map((item, index) => (
          <li className={`list-group-item ${styles.listGroupItem}`} key={index}>
            {editedItems[index] ? (
              <>
                <input
                  type="text"
                  value={editedValues[index]}
                  onChange={(event) => handleInputChange(event, index)}
                  onKeyDown={(event) => handleKeyPress(event, index)}
                />
                <button
                  style={{ padding: "0 16px", marginLeft: "10px" }}
                  className="btn btn-secondary"
                  onClick={() => editItem(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  value=""
                  id={`checkbox-${index}`}
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label
                  className={`form-check-label ${
                    checkedItems[index] ? "text-decoration-line-through" : ""
                  }`}
                  htmlFor={`checkbox-${index}`}
                >
                  {item}
                </label>
                <div className={styles.buttons}>
                  <BiEditAlt
                    size={25}
                    color="black"
                    className={styles.editBtn}
                    onClick={() => editItem(index)}
                  />
                  <BsFillTrashFill
                    size={25}
                    color="red"
                    className={styles.deleteBtn}
                    onClick={() => deleteItem(index)}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
