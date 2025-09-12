"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../components/ui/tabs";

import dynamic from "next/dynamic";
const AddTextVoice = dynamic(() => import("../../../../components/workspace/AddTextVoice"));
const WordsToLife = dynamic(() => import("../../../../components/workspace/WordsToLife"));
const Sounds = dynamic(() => import("../../../../components/workspace/Sounds"));
const IntroExit = dynamic(() => import("../../../../components/workspace/IntroExit"));
const ExportTab = dynamic(() => import("../../../../components/workspace/ExportTab"));

export default function WorkspacePage() {
  return (
    <Tabs defaultValue="addtextvoice" className="w-full">
      <TabsList>
        <TabsTrigger value="addtextvoice">Add Text / Voice</TabsTrigger>
        <TabsTrigger value="words">Words to Life</TabsTrigger>
        <TabsTrigger value="sounds">Sounds</TabsTrigger>
        <TabsTrigger value="introexit">Intro/Exit</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>

      <div className="mt-4">
        <TabsContent value="addtextvoice"><AddTextVoice /></TabsContent>
        <TabsContent value="words"><WordsToLife /></TabsContent>
        <TabsContent value="sounds"><Sounds /></TabsContent>
        <TabsContent value="introexit"><IntroExit /></TabsContent>
        <TabsContent value="export"><ExportTab /></TabsContent>
      </div>
    </Tabs>
  );
}
