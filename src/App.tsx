import { FC } from 'react';
import './style.css';
import { getRouterFromComponents } from './route';
import { PageComps } from './pages';

export const App: FC<{ name: string }> = ({ name }) => {
  return getRouterFromComponents(PageComps);
};
