import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import LoginForm from '@/components/LoginForm/LoginForm';

const Login = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="mx-2 flex justify-center">
        <div className="my-10 p-20 shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
