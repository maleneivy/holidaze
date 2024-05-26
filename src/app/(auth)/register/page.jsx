import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';

const {
  default: RegistrationForm,
} = require('@/components/RegisterForm/RegisterForm');

export const metadata = {
  title: 'Regstration Page Page',
  description: 'Registration page on Holidaze',
};

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
