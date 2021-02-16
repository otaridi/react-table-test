import React, {forwardRef, useRef, useEffect} from "react";

const Checkbox = forwardRef(({indeterminate, ...rest}, ref) => {
        const defaultRef = useRef()
        const resolvedRef = ref || defaultRef

       const checkboxClick = () => {
         //  console.log(resolvedRef.current.checked);
       };

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
          <span onClick={checkboxClick}>
            <input
              type="checkbox"
              ref={resolvedRef}
              {...rest}
              title="check as reviewed"
              style={{ margin: 0 }}
            />
          </span>
        );
    }
)

export default Checkbox