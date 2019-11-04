import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/demo',
  name: 'demo',
  meta,
  redirect: { name: 'demo-single' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'single', name: `${pre}single`, component: () => import('@/pages/demo/single'), meta: { ...meta, title: '内容审核' } },
    { path: 'textarea', name: `${pre}textarea`, component: () => import('@/pages/demo/textarea'), meta: { ...meta, title: '多行文本预测' } },
    { path: 'batch', name: `${pre}batch`, component: () => import('@/pages/demo/batch'), meta: { ...meta, title: '文件批量预测' } }
  ])('demo-')
}
