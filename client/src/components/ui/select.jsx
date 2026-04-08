export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={`border rounded p-2 w-full ${props.className || ""}`}
    >
      {children}
    </select>
  );
}
