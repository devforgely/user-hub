import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {LoginForm, ProFormText} from '@ant-design/pro-form';
import {history, useSearchParams} from 'umi';
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [searchParams] = useSearchParams();

  //提交注册
  const handleSubmit = async (values: API.RegisterParams) => {

    const {userPassword, confirmPassword} = values;
    // 校验
    if(userPassword != confirmPassword){
      message.error('Passwords entered twice are inconsistent.');
      return;
    }
    try {
      // 注册
      const response = await register(values);

      if (response.data != -1) {
        const defaultLoginSuccessMessage = 'Register Successful！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const redirect = searchParams.get('redirect');
        history.push('/user/login' + (redirect ? `?redirect=${redirect}` : ''));
        return;
      }
      else{
        throw  new Error(`register error id = ${response.data}`)
      }

    } catch (error) {
      const defaultLoginFailureMessage = 'Register Failed, Please Try Again！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter = {{
            searchConfig: {
              submitText: 'Register'
            }
          }}
          logo={<img alt="logo" src={"/logo.svg"} />}
          title="User Hub"
          subTitle={'Code. Share. Grow.'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType} centered
            items={[
              {
                key: 'account',
                label: 'Account Register',
              }
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Please enter your account'}
                rules={[
                  {
                    required: true,
                    message: 'Account is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Please enter your password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password must be at least 8 characters long',
                  },
                ]}
              />
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Please re-enter your password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password must be at least 8 characters long',
                  },
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'Please enter your planet code'}
                rules={[
                  {
                    required: true,
                    message: 'Planet code is required!',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;