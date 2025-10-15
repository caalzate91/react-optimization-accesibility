import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function UserCard({ user }: { user: { name: string; email: string } }) {
  return (
    <section aria-label="User Info">
      <h2>{user.name}</h2>
      <p>
        <span>Email:</span>
        <a href={`mailto:${user.email}`} aria-label="user-email">
          {user.email}
        </a>
      </p>
      <button aria-label="edit-user">Edit</button>
    </section>
  );
}

describe('UserCard accessibility', () => {
  it('renders user info with accessible selectors', () => {
    const user = { name: 'Jane Doe', email: 'jane@example.com' };
    render(<UserCard user={user} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Jane Doe');
    expect(screen.getByLabelText('user-email')).toHaveTextContent('jane@example.com');
    expect(screen.getByLabelText('edit-user')).toBeInTheDocument();
    expect(screen.getByLabelText('User Info')).toBeInTheDocument();
  });
});