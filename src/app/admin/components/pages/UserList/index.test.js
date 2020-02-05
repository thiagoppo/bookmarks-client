import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from 'test-utils';
import { UserList } from './index';

describe('UserList', () => {
  it('renders without crashing', () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        <UserList count={1} offset={1} limit={10} total={1} onRequestGetUsers={jest.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
