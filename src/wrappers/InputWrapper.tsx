const InputWrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-4 w-xl mx-auto justify-center ${classNames}`}
    >
      {children}
    </div>
  );
};

export default InputWrapper;
