import Foundation
import Vision
import CoreImage
import AppKit

// Keep the original photograph's RGB pixels. Vision supplies only an alpha mask.
let context = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
for name in ["lianjun-zhang", "yongtao-zhu", "kevin-chan"] {
  let input = URL(fileURLWithPath: "design/scholar-cards-2026-10-04/originals/\(name).png")
  let output = URL(fileURLWithPath: "design/scholar-cards-2026-10-04/processed/\(name)-cutout.png")
  let handler = VNImageRequestHandler(url: input)
  let request = VNGeneratePersonSegmentationRequest()
  request.qualityLevel = .accurate
  request.outputPixelFormat = kCVPixelFormatType_OneComponent8
  try handler.perform([request])
  guard let observation = request.results?.first else { fatalError("No mask: \(name)") }
  let original = CIImage(contentsOf: input)!
  let lowResolutionMask = CIImage(cvPixelBuffer: observation.pixelBuffer)
  let mask = lowResolutionMask.transformed(by: CGAffineTransform(scaleX: original.extent.width / lowResolutionMask.extent.width, y: original.extent.height / lowResolutionMask.extent.height))
  let transparent = CIImage(color: .clear).cropped(to: original.extent)
  let result = original.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: transparent, kCIInputMaskImageKey: mask])
  try context.writePNGRepresentation(of: result, to: output, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  print("\(name): \(original.extent), accurate person alpha mask")
}
