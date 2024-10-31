
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/app/components/ui/dialog"
  import { Button } from "@/app/components/ui/button"
  import { Checkbox } from "@/app/components/ui/checkbox"
  import { Label } from "@/app/components/ui/label"
import { useState } from "react";
  
  export function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [options, setOptions] = useState({
      openEnded: true,
      multipleChoice: true,
      trueFalse: true,
    })
  
    const generateQuiz = () => {
      console.log("Generating quiz with options:", options)
      onClose()
    }
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Quiz</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="openEnded"
                checked={options.openEnded}
                onCheckedChange={(checked: boolean) =>
                  setOptions({ ...options, openEnded: checked as boolean })
                }
              />
              <Label htmlFor="openEnded">Open-ended Questions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multipleChoice"
                checked={options.multipleChoice}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, multipleChoice: checked as boolean })
                }
              />
              <Label htmlFor="multipleChoice">Multiple Choice Questions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trueFalse"
                checked={options.trueFalse}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, trueFalse: checked as boolean })
                }
              />
              <Label htmlFor="trueFalse">True/False Questions</Label>
            </div>
            <Button
              onClick={generateQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
            >
              Generate Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }