import { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import Button from 'components/form/button';
import Input from 'components/form/input';
import Select from 'components/form/select';
import Modal from 'components/modal';
import useAppState from 'hooks/useAppState';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Form {
  question: string;
  options: string[];
  correctAnswer?: SelectOption;
}

export default function AddQuestionModal({ onClose, open }: Props) {
  const { addQuestion } = useAppState();

  const [form, setForm] = useState<Form>({
    question: '',
    options: ['', '', '', ''],
  });

  const [errors, setErrors] = useState<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>({
    question: '',
    options: [],
    correctAnswer: '',
  });

  const changeHandler = ({ target: { name, value } }: _ChangeHandlerEvent) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const onOptionChange = (index: number, value: string) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm((prev) => ({
      ...prev,
      options: newOptions,
    }));

    const newErrors = [...errors.options];
    newErrors[index] = '';
    setErrors((prev) => ({
      ...prev,
      options: newErrors,
    }));
  };

  const selectHandler = ({ target: { name, value } }: _SelectValue) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const submitHandler = (e: _FormSubmitEvent) => {
    e.preventDefault();

    const newErrors = { ...errors };

    form.options.forEach((option, index) => {
      if (!option) {
        newErrors.options[index] = `Option ${index + 1} is required`;
      }
    });

    if (!form.question) {
      newErrors.question = 'Question is required';
    }
    if (form.correctAnswer === undefined) {
      newErrors.correctAnswer = 'Correct answer is required';
    }

    if (
      !form.question ||
      form.options.some((option) => !option) ||
      form.correctAnswer === undefined
    ) {
      setErrors(newErrors);
      return;
    }

    // TODO: add feature to add or remove options
    if (form.options.length < 2) {
      toast.error('At least 2 options are required');
      return;
    }

    const id = uuidv4();

    const payload: QuestionType = {
      ...form,
      correctAnswer: Number(form.correctAnswer?.value),
      id,
    };

    addQuestion(payload);
    onClose();
  };

  return (
    <Modal title="Add Question" className="max-w-2xl" onCancel={onClose} visible={open}>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <Input
          onChange={changeHandler}
          value={form.question}
          name="question"
          label="Question"
          helpText={errors.question}
          error={!!errors.question}
        />
        {form.options.map((option, index) => (
          <Input
            key={index}
            onChange={(e) => onOptionChange(index, e.target.value)}
            value={option}
            label={`Option ${index + 1}`}
            helpText={errors.options[index]}
            error={!!errors.options[index]}
          />
        ))}
        <Select
          placeholder="Select correct answer"
          onChange={selectHandler}
          value={form.correctAnswer}
          options={form.options
            .filter((el) => !!el)
            .map((option, index) => ({
              label: option,
              value: index + '',
            }))}
          name="correctAnswer"
          label="Correct Answer"
          helpText={errors.correctAnswer}
          error={!!errors.correctAnswer}
        />
        <div className="flex justify-end mt-2">
          <Button>Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
