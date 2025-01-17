import React from 'react';

const AuthInput: React.VFC<{
  autoComplete?: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
}> = ({ autoComplete, label, onChange, type }) => {
  return (
    <label className="block">
      <p>{label}</p>
      <p className="mt-2">
        <input
          autoComplete={autoComplete}
          className="border-b focus:border-b-2 border-green-300 focus:border-green-600 focus:outline-none"
          onChange={onChange}
          type={type}
        />
      </p>
    </label>
  );
};

export { AuthInput };
