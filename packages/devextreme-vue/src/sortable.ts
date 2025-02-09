import { PropType } from "vue";
import { defineComponent } from "vue";
import { prepareComponentConfig } from "./core/index";
import Sortable, { Properties } from "devextreme/ui/sortable";
import {
 DragDirection,
 DragHighlight,
 Orientation,
} from "devextreme/common";
import {
 AddEvent,
 DisposingEvent,
 DragChangeEvent,
 DragEndEvent,
 DragMoveEvent,
 DragStartEvent,
 InitializedEvent,
 OptionChangedEvent,
 RemoveEvent,
 ReorderEvent,
} from "devextreme/ui/sortable";
import { prepareConfigurationComponentConfig } from "./core/index";

type AccessibleOptions = Pick<Properties,
  "allowDropInsideItem" |
  "allowReordering" |
  "autoScroll" |
  "boundary" |
  "container" |
  "cursorOffset" |
  "data" |
  "dragDirection" |
  "dragTemplate" |
  "dropFeedbackMode" |
  "elementAttr" |
  "filter" |
  "group" |
  "handle" |
  "height" |
  "itemOrientation" |
  "moveItemOnDrop" |
  "onAdd" |
  "onDisposing" |
  "onDragChange" |
  "onDragEnd" |
  "onDragMove" |
  "onDragStart" |
  "onInitialized" |
  "onOptionChanged" |
  "onRemove" |
  "onReorder" |
  "rtlEnabled" |
  "scrollSensitivity" |
  "scrollSpeed" |
  "width"
>;

interface DxSortable extends AccessibleOptions {
  readonly instance?: Sortable;
}

const componentConfig = {
  props: {
    allowDropInsideItem: Boolean,
    allowReordering: Boolean,
    autoScroll: Boolean,
    boundary: {},
    container: {},
    cursorOffset: [Object, String] as PropType<Record<string, any> | string>,
    data: {},
    dragDirection: String as PropType<DragDirection>,
    dragTemplate: {},
    dropFeedbackMode: String as PropType<DragHighlight>,
    elementAttr: Object as PropType<Record<string, any>>,
    filter: String,
    group: String,
    handle: String,
    height: [Function, Number, String] as PropType<((() => number | string)) | number | string>,
    itemOrientation: String as PropType<Orientation>,
    moveItemOnDrop: Boolean,
    onAdd: Function as PropType<((e: AddEvent) => void)>,
    onDisposing: Function as PropType<((e: DisposingEvent) => void)>,
    onDragChange: Function as PropType<((e: DragChangeEvent) => void)>,
    onDragEnd: Function as PropType<((e: DragEndEvent) => void)>,
    onDragMove: Function as PropType<((e: DragMoveEvent) => void)>,
    onDragStart: Function as PropType<((e: DragStartEvent) => void)>,
    onInitialized: Function as PropType<((e: InitializedEvent) => void)>,
    onOptionChanged: Function as PropType<((e: OptionChangedEvent) => void)>,
    onRemove: Function as PropType<((e: RemoveEvent) => void)>,
    onReorder: Function as PropType<((e: ReorderEvent) => void)>,
    rtlEnabled: Boolean,
    scrollSensitivity: Number,
    scrollSpeed: Number,
    width: [Function, Number, String] as PropType<((() => number | string)) | number | string>
  },
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:allowDropInsideItem": null,
    "update:allowReordering": null,
    "update:autoScroll": null,
    "update:boundary": null,
    "update:container": null,
    "update:cursorOffset": null,
    "update:data": null,
    "update:dragDirection": null,
    "update:dragTemplate": null,
    "update:dropFeedbackMode": null,
    "update:elementAttr": null,
    "update:filter": null,
    "update:group": null,
    "update:handle": null,
    "update:height": null,
    "update:itemOrientation": null,
    "update:moveItemOnDrop": null,
    "update:onAdd": null,
    "update:onDisposing": null,
    "update:onDragChange": null,
    "update:onDragEnd": null,
    "update:onDragMove": null,
    "update:onDragStart": null,
    "update:onInitialized": null,
    "update:onOptionChanged": null,
    "update:onRemove": null,
    "update:onReorder": null,
    "update:rtlEnabled": null,
    "update:scrollSensitivity": null,
    "update:scrollSpeed": null,
    "update:width": null,
  },
  computed: {
    instance(): Sortable {
      return (this as any).$_instance;
    }
  },
  beforeCreate() {
    (this as any).$_WidgetClass = Sortable;
    (this as any).$_hasAsyncTemplate = true;
    (this as any).$_expectedChildren = {
      cursorOffset: { isCollectionItem: false, optionName: "cursorOffset" }
    };
  }
};

prepareComponentConfig(componentConfig);

const DxSortable = defineComponent(componentConfig);


const DxCursorOffsetConfig = {
  emits: {
    "update:isActive": null,
    "update:hoveredElement": null,
    "update:x": null,
    "update:y": null,
  },
  props: {
    x: Number,
    y: Number
  }
};

prepareConfigurationComponentConfig(DxCursorOffsetConfig);

const DxCursorOffset = defineComponent(DxCursorOffsetConfig);

(DxCursorOffset as any).$_optionName = "cursorOffset";

export default DxSortable;
export {
  DxSortable,
  DxCursorOffset
};
import type * as DxSortableTypes from "devextreme/ui/sortable_types";
export { DxSortableTypes };
