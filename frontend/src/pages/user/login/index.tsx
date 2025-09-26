import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {LoginForm, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {history, useModel, useSearchParams} from 'umi';
import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<{status?: string; type?: string}>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [searchParams] = useSearchParams();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const defaultLoginFailureMessage = 'Login failed, please try again!';
    try {
      const response = await login({...values, type });
      
      if (response.data) {
        const defaultLoginSuccessMessage = 'Login successful!';
        message.success(defaultLoginSuccessMessage);
        
        await fetchUserInfo();
        if (!history) return;
        const redirect = searchParams.get('redirect');
        history.push(redirect || '/');
        return;
      }      
      // If fail, show error message
      console.log(response);
      setUserLoginState(response);
      message.error(defaultLoginFailureMessage);
    } catch (error) {
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter = {{
            searchConfig: {
              submitText: 'Login'
            }
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="User Hub"
          subTitle={'Code. Share. Grow.'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType} centered
            items={[
              {
                key: 'account',
                label: 'Account Login',
              }
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'Incorrect account/password'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Account:'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your account!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Password:'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
          <ProFormCheckbox noStyle name="autoLogin">
            Remember me
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Forgot password?
          </a>
          </div>
        </LoginForm>
        <div style={{ textAlign: 'center', marginTop: -100 }}>
          <p>Don't have an account? <a href="/user/register">Register now</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
