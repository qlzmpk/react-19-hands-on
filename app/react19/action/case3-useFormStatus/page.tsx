"use client";

import { useFormStatus } from "react-dom";

const formAction1 = async () => {
  console.log("formAction1");
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const formAction2 = async () => {
  console.log("formAction2");
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export default function Page() {
  return (
    <form>
      <div>
        <TextField />
      </div>
      <div>
        <label>
          <input type="checkbox" name="checkbox" /> Checkbox
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="radio" value="1" defaultChecked />
          Radio 1
        </label>
        <label>
          <input type="radio" name="radio" value="2" />
          Radio 2
        </label>
        <label>
          <input type="radio" name="radio" value="3" />
          Radio 3
        </label>
      </div>
      <div>
        <Button formAction={formAction1}>Submit1</Button>
        <Button formAction={formAction2}>Submit2</Button>
      </div>
    </form>
  );
}

const TextField = () => {
  const formStatus = useFormStatus();
  const { pending, data, method, action } = formStatus;

  console.log(formStatus);
  console.log(data && [...data.entries()]);

  return <input name="hogehoge" disabled={pending} />;
};

const Button = ({
  children,
  formAction,
}: {
  children: string;
  formAction: (formData: FormData) => void;
}) => {
  const { pending, action } = useFormStatus();

  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending && action === formAction}
    >
      {children}
    </button>
  );
};
