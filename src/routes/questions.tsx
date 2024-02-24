import { useState } from 'react';

import Button from 'components/form/button';
import AddQuestionModal from 'features/questions/AddQuestion.modal';
import DeleteConfirmationModal from 'features/questions/DeleteConfirmation.modal';
import EditQuestionModal from 'features/questions/EditQuestion.modal';
import QuestionCard from 'features/questions/QuestionCard';
import useAppState from 'hooks/useAppState';

export default function QuestionsPage() {
  const { questions, deleteQuestion } = useAppState();
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>(undefined);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const openEditQuestionHandler = (question: QuestionType) => {
    setSelectedQuestion(question);
    setOpenEditModal(true);
  };

  const closeEditQuestionModal = () => {
    setOpenEditModal(false);
    setSelectedQuestion(undefined);
  };

  const toggleAddModalHandler = () => {
    setOpenAddModal(!openAddModal);
  };

  const toggleDeleteModalHandler = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const openDeleteQuestionHandler = (id: string) => {
    setSelectedQuestionId(id);
    setOpenDeleteModal(true);
  };
  const onDeleteQuestionHandler = () => {
    if (selectedQuestionId) {
      deleteQuestion(selectedQuestionId);
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-5 border-b border-slate-300 pb-2">
        <h2 className="text-2xl font-medium">Questions</h2>
        <Button onClick={toggleAddModalHandler}>Add Question</Button>
      </div>
      {questions.map((question, index) => (
        <QuestionCard
          index={index}
          key={question.id}
          question={question}
          onEdit={openEditQuestionHandler}
          onDelete={openDeleteQuestionHandler}
        />
      ))}

      <AddQuestionModal open={openAddModal} onClose={toggleAddModalHandler} />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={toggleDeleteModalHandler}
        onClick={onDeleteQuestionHandler}
      />

      {selectedQuestion && (
        <EditQuestionModal
          onClose={closeEditQuestionModal}
          data={selectedQuestion}
          open={openEditModal}
        />
      )}
    </div>
  );
}
