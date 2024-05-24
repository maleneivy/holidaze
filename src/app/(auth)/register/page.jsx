import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';

const {
  default: RegistrationForm,
} = require('@/components/RegisterForm/RegisterForm');

const RegisterPage = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-center">
        <div className="my-10 p-20 shadow-lg">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
