import { createSelector } from 'reselect';
import {IStoreState} from "@/types"

const projectMembersSelector=(state:IStoreState)=>state.project.projectMembers
export const projectMembersMapSelector=createSelector(
  projectMembersSelector,
  items=>items.reduce((total,item)=>{total[item.id]=item;return total;},{})
)