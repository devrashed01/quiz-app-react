import { useState } from 'react';

import Button from 'components/form/button';
import AddQuestionModal from 'features/questions/AddQuestion.modal';
import EditQuestionModal from 'features/questions/EditQuestion.modal';
import QuestionCard from 'features/questions/QuestionCard';
import useAppState from 'hooks/useAppState';

export default function QuestionsPage() {
  const { questions, deleteQuestion } = useAppState();
  const [editQuestion, setEditQuestion] = useState<QuestionType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isOpenAddModal, setOpenAddModal] = useState<boolean>(false);

  const editQuestionHandler = (question: QuestionType) => {
    setEditQuestion(question);
    setShowEditModal(true);
  };

  const closeQuestionModal = () => {
    setShowEditModal(false);
    setEditQuestion(undefined);
  };

  const openAddModalHandler = () => {
    setOpenAddModal(true);
  };
  const closeAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-5 border-b border-slate-300 pb-2">
        <h2 className="text-2xl font-medium">Questions:</h2>
        <Button onClick={openAddModalHandler}>Add Question</Button>
      </div>
      {questions.map((question, index) => (
        <QuestionCard
          index={index}
          key={question.id}
          question={question}
          onEdit={editQuestionHandler}
          onDelete={deleteQuestion}
        />
      ))}

      {<AddQuestionModal open={isOpenAddModal} onClose={closeAddModal} />}

      {editQuestion && (
        <EditQuestionModal onClose={closeQuestionModal} data={editQuestion} open={showEditModal} />
      )}
    </div>
  );
}
