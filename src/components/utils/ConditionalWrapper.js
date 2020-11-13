const Wrapper = ({ condition, wrapper, children }) => condition ? wrapper(children) : children
export default Wrapper