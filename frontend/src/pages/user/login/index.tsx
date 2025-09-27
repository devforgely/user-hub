import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {Alert, message, Tabs, Typography} from 'antd';
import React, {useState} from 'react';
import {LoginForm, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {history, useModel} from 'umi';
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
  const [status, setStatus] = useState<boolean>(true);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const defaultLoginFailureMessage = 'Login failed, please try again!';
    try {
      const response = await login({...values });
      
      if (response.data) {
        const defaultLoginSuccessMessage = 'Login successful!';
        message.success(defaultLoginSuccessMessage);
        
        await fetchUserInfo();
        setTimeout(() => {
          if (!history) return;
          history.replace('/');
        }, 100);
        return;
      }      
      // If fail, show error message
      console.log(response);
      setStatus(false);
      message.error(defaultLoginFailureMessage);
    } catch (error) {
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
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
          <Tabs activeKey="account" centered
            items={[
              {
                key: 'account',
                label: 'Account Login',
              }
            ]}
          />

          {status === false && (
            <LoginMessage content={'Incorrect account/password'} />
          )}

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
        <Typography.Text 
          style={{ 
            display: 'block', 
            textAlign: 'center'
          }}
        >
          Don't have an account? <Typography.Link href="/user/register">Register now</Typography.Link>
        </Typography.Text>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
