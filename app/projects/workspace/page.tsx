"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";

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
        <TabsContent value="addtextvoice">
          <div className="rounded-lg border p-4">Add Text / Voice — placeholder content</div>
        </TabsContent>
        <TabsContent value="words">
          <div className="rounded-lg border p-4">Words to Life — placeholder content</div>
        </TabsContent>
        <TabsContent value="sounds">
          <div className="rounded-lg border p-4">Sounds — placeholder content</div>
        </TabsContent>
        <TabsContent value="introexit">
          <div className="rounded-lg border p-4">Intro/Exit — placeholder content</div>
        </TabsContent>
        <TabsContent value="export">
          <div className="rounded-lg border p-4">Export — placeholder content</div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
