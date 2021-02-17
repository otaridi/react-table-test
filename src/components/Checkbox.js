import React, {forwardRef, useRef, useEffect} from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";

const Checkbox = forwardRef(({indeterminate, ...rest}, ref) => {
  // console.log(rest);

  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  const checkboxClick = () => {
    console.log(rest);

     console.log(resolvedRef.current);
  };

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <span
      onClick={checkboxClick}
      // ref={resolvedRef}
      // {...rest}
      // title="delete"
      // style={{ margin: 0 }}
    >
      {/* <RiDeleteBin6Line /> */}
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        title="delete"
        style={{ margin: 0 }}
      />
    </span>
  );
}
)

export default Checkbox