//
//  ShellTools.swift
//  gitgit-macOS
//
//  Created by Laurens Lamberts on 19/11/2021.
//

import Foundation

@objc(ShellTools)
class ShellTools: RCTEventEmitter  {
  
  func shell(_ command: String) -> String {
      let task = Process()
      let pipe = Pipe()
      
      task.standardOutput = pipe
      task.standardError = pipe
      task.arguments = ["-c", command]
      task.launchPath = "/bin/zsh"
      task.launch()
      
      let data = pipe.fileHandleForReading.readDataToEndOfFile()
      let output = String(data: data, encoding: .utf8)!
      
      return output
  }
  
  override func supportedEvents() -> [String]! {
      return []
  }
  
  func didReceive(error: Error) {
  }
  
  override func startObserving() {
  }

  override func stopObserving() {
  }
  
  @objc
  func executeCommand(_ command: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock)
  {
    let output = shell(command);
    resolver(output);
  }
}
