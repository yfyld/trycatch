import { createSelector } from 'reselect';
import {StoreState} from "@/types"

const projectMembersSelector=(state:StoreState)=>state.project.projectMembers
export const projectMembersMapSelector=createSelector(
  projectMembersSelector,
  items=>items.reduce((total,item)=>{total[item.id]=item;return total;},{})
)