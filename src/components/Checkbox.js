import React, {forwardRef, useRef, useEffect} from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Checkbox = forwardRef(
  ({ indeterminate, row, toggleModal, setRemoveRow, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    const clickHandler = () => {
      toggleModal();
      setRemoveRow(row);
    };

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <span
        onClick={clickHandler}
        ref={resolvedRef}
        {...rest}
        title="delete"
        style={{ margin: 0 }}
      >
        <RiDeleteBin6Line />
        {/* <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        title="delete"
        style={{ margin: 0 }}
      /> */}
      </span>
    );
  }
);

export default Checkbox