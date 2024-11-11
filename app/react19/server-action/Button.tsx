"use client";

export default function Button({
  onClick,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      onClick={async (event) => {
        const result = await onClick?.(event);
        console.log(result);
      }}
      {...props}
    />
  );
}
