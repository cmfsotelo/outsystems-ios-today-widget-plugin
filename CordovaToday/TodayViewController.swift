//
//  TodayViewController.swift
//  CordovaToday
//
//  Created by André Gonçalves on 11/10/2019.
//

import UIKit
import NotificationCenter
import WebKit

class TodayViewController: UIViewController, NCWidgetProviding {
        
   
    @IBOutlet weak var webView2: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let urlString = Bundle.main.infoDictionary!["WebViewUrl"] as! String
        let url = URL (string: urlString);
        let request = URLRequest(url: url!);
        webView2.load(request);
    }
        
    func widgetPerformUpdate(completionHandler: (@escaping (NCUpdateResult) -> Void)) {
        // Perform any setup necessary in order to update the view.
        
        // If an error is encountered, use NCUpdateResult.Failed
        // If there's no update required, use NCUpdateResult.NoData
        // If there's an update, use NCUpdateResult.NewData
        
        completionHandler(NCUpdateResult.newData)
    }
    
}
