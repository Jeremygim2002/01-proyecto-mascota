import React from "react";

export const PinInput = ({ children, value, onChange, ...props }) => {
  const handleChange = (e, i) => {
    const val = e.target.value;
    const chars = value.split("");
    chars[i] = val.slice(-1);
    onChange(chars.join(""));

    const next = e.target.nextElementSibling;
    if (next && val) next.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0) {
      const prev = e.target.previousElementSibling;
      if (prev) prev.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-6 p-4" {...props}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          value: value[i] || "",
          onChange: (e) => handleChange(e, i),
          onKeyDown: (e) => handleKeyDown(e, i),
        })
      )}
    </div>
  );
};

export const PinInputField = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    inputMode="numeric"
    maxLength={1}
    className="w-16 h-20 text-3xl text-center rounded-xl border border-slate-500 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
    {...props}
  />
));
