import { useEffect, useState } from 'react';
import '../css/users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const response = await fetch('/api/users');

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setUsers(Array.isArray(data) ? data : []);
          setStatus('success');
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
          setStatus('error');
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="users">
      <section className="users__header">
        <div>
          <p className="users__label">Users</p>
          <h1 className="users__title">사용자 목록</h1>
        </div>
        <span className="users__count">{users.length}명</span>
      </section>

      {status === 'loading' && <p className="users__state">불러오는 중입니다.</p>}

      {status === 'error' && (
        <p className="users__state users__state--error">
          사용자 목록을 불러오지 못했습니다. {errorMessage}
        </p>
      )}

      {status === 'success' && (
        <div className="users__table-wrap">
          <table className="users__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>계정</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>이메일</th>
                <th>권한</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_phone}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_auth}</td>
                  <td>{user.user_del_yn === 'Y' ? '삭제' : '정상'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p className="users__empty">등록된 사용자가 없습니다.</p>}
        </div>
      )}
    </main>
  );
}
