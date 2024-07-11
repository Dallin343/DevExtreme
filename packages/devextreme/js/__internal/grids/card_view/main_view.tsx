import type { Subscribable } from '@ts/core/reactive';
import type { InfernoNode } from 'inferno';

import { ContentView } from './content_view/content_view';
import { asInferno, View } from './core/view';
import { HeaderPanelView } from './header_panel/view';
import { HeadersView } from './headers/view';
import { PagerView } from './pager';

export class MainView extends View {
  public vdom: InfernoNode | Subscribable<InfernoNode>;

  static dependencies = [ContentView, PagerView, HeaderPanelView, HeadersView] as const;

  constructor(
    _content: ContentView,
    _pager: PagerView,
    _headerPanel: HeaderPanelView,
    _headers: HeadersView,
  ) {
    super();
    const HeaderPanel = asInferno(_headerPanel);
    const Content = asInferno(_content);
    const Pager = asInferno(_pager);
    const Headers = asInferno(_headers);

    this.vdom = <>
      <HeaderPanel></HeaderPanel>
      <Headers></Headers>
      <Content></Content>
      <Pager></Pager>
    </>;
  }
}
