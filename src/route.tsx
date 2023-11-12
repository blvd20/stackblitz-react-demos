import { FC } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

/**
 * 自动生成 Router
 * 方便开发时调试
 */
export function getRouterFromComponents(comps: FC[]) {
  const Pages = comps.map((Comp) => {
    return {
      path: '/' + Comp.name,
      element: <Comp />,
    };
  });

  const Links = Pages.map((page) => {
    return (
      <div key={page.path}>
        <Link to={page.path}>{page.path}</Link>
      </div>
    );
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <h1>Exmple list</h1>
          {Links}
        </div>
      ),
    },
    ...Pages,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
