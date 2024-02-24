import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from 'components/form/button';
import Input from 'components/form/input';
import Select from 'components/form/select';
import Modal from 'components/modal';
import useAppState from 'hooks/useAppState';

interface Props {
  open: boolean;
  data: QuestionType;
  onClose: () => void;
}

interface Form {
  question: string;
  options: string[];
  correctAnswer?: SelectOption;
}

export default function EditQuestionModal({ onClose, data, open }: Props) {
  const { updateQuestion } = useAppState();

  const [form, setForm] = useState<Form>({
    question: '',
    options: [],
  });

  const [errors, setErrors] = useState<{
    question: string;
    options: string;
  }>({
    question: '',
    options: '',
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      question: data.question,
      options: data.options,
      correctAnswer: {
        label: data.options[data.correctAnswer],
        value: data.correctAnswer + '',
      },
    }));
  }, [data]);

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
  };

  const selectHandler = ({ target: { name, value } }: _SelectValue) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e: _FormSubmitEvent) => {
    e.preventDefault();

    if (!form.question || !form.correctAnswer) {
      setErrors((prev) => ({
        ...prev,
        question: !form.question ? 'Question is required' : '',
        options: !form.correctAnswer ? 'Correct answer is required' : '',
      }));
      return;
    }

    if (form.options.length < 2) {
      toast.error('At least 2 options are required');
      return;
    }

    const payload: QuestionType = {
      ...form,
      correctAnswer: Number(form.correctAnswer?.value),
      id: data.id,
    };

    updateQuestion(payload, data.id);
    onClose();
  };

  return (
    <Modal title="Edit Question" className="max-w-2xl" onCancel={onClose} visible={open}>
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
          helpText={errors.question}
          error={!!errors.question}
        />
        <div className="flex justify-end mt-2">
          <Button>Update</Button>
        </div>
      </form>
    </Modal>
  );
}
