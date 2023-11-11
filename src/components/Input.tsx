import React from "react";

type inputProps = {
  title: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (name:string,value:string) => void;
  name: string;
  value:string
};
function Input({ title, onChange, type, name,value }: inputProps) {
  return (
    <>
      <div className="relative py-2  ">
        <label className="text-lg first-letter:uppercase" htmlFor={name}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
        </label>

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          autoComplete="off"
          placeholder=""
          className={`w-full bg-neutral-700 py-1 text-lg px-2  mt-1 rounded focus:outline-none border-2 border-neutral-700 focus:border-green-600 transition`}
        
          onChange={(e)=>{onChange(e.target.name,e.target.value)}}
        />
      </div>
    </>
  );
}

export default Input;
