const {
  default: RegistrationForm,
} = require('@/components/RegisterForm/RegisterForm');

const RegisterPage = () => {
  return (
    <main className="flex justify-center">
      <div className="my-10 p-20 shadow-lg">
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegisterPage;
