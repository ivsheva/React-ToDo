import { useState } from "react";
import styles from "./ListGroup.module.css";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  items: string[];
  onDeleteItem: (index: number) => void;
}

const ListGroup = ({ items, onDeleteItem }: Props) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  function handleCheckboxChange(index: number) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  }

  function deleteItem(index: number) {
    onDeleteItem(index);
  }

  return (
    <div className={styles.wrapper}>
      <ul className="list-group">
        {items.map((item, index) => (
          <li className={`list-group-item ${styles.listGroupItem}`} key={index}>
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              id={`checkbox-${index}`}
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            ></input>
            <label
              className={`form-check-label ${
                checkedItems[index] ? "text-decoration-line-through" : ""
              }`}
              htmlFor={`checkbox-${index}`}
            >
              {item}
            </label>
            <BsFillTrashFill
              size={25}
              color="red"
              className={styles.deleteBtn}
              onClick={() => deleteItem(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
