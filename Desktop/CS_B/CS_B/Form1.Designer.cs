namespace CS_B
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.dgStudent = new System.Windows.Forms.DataGridView();
            this.dtsTabelaTestowa = new System.Data.DataSet();
            this.grpModyfikacja = new System.Windows.Forms.GroupBox();
            this.btnModyfikuj = new System.Windows.Forms.Button();
            this.lblDaneKontaktowe = new System.Windows.Forms.Label();
            this.lblNazwisko = new System.Windows.Forms.Label();
            this.lblImie = new System.Windows.Forms.Label();
            this.txtDaneKontaktowe = new System.Windows.Forms.TextBox();
            this.txtNazwisko = new System.Windows.Forms.TextBox();
            this.txtImie = new System.Windows.Forms.TextBox();
            this.grpDodawanie = new System.Windows.Forms.GroupBox();
            this.btnDodaj = new System.Windows.Forms.Button();
            this.lblDaneKontaktoweDodawanie = new System.Windows.Forms.Label();
            this.lblNazwiskoDodawanie = new System.Windows.Forms.Label();
            this.lblImieDodawanie = new System.Windows.Forms.Label();
            this.txtDaneKontaktoweDodawanie = new System.Windows.Forms.TextBox();
            this.txtNazwiskoDodawanie = new System.Windows.Forms.TextBox();
            this.txtImieDodawanie = new System.Windows.Forms.TextBox();
            this.lblTabela = new System.Windows.Forms.Label();
            this.ink_info = new System.Windows.Forms.Label();
            this.ink_id = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dgStudent)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dtsTabelaTestowa)).BeginInit();
            this.grpModyfikacja.SuspendLayout();
            this.grpDodawanie.SuspendLayout();
            this.SuspendLayout();
            // 
            // dgStudent
            // 
            this.dgStudent.AllowUserToAddRows = false;
            this.dgStudent.AllowUserToDeleteRows = false;
            this.dgStudent.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dgStudent.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgStudent.Location = new System.Drawing.Point(12, 71);
            this.dgStudent.Name = "dgStudent";
            this.dgStudent.ReadOnly = true;
            this.dgStudent.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgStudent.Size = new System.Drawing.Size(693, 220);
            this.dgStudent.TabIndex = 0;
            this.dgStudent.SelectionChanged += new System.EventHandler(this.dgStudent_SelectionChanged);
            // 
            // dtsTabelaTestowa
            // 
            this.dtsTabelaTestowa.DataSetName = "dtsTabelaTestowa";
            // 
            // grpModyfikacja
            // 
            this.grpModyfikacja.Controls.Add(this.btnModyfikuj);
            this.grpModyfikacja.Controls.Add(this.lblDaneKontaktowe);
            this.grpModyfikacja.Controls.Add(this.lblNazwisko);
            this.grpModyfikacja.Controls.Add(this.lblImie);
            this.grpModyfikacja.Controls.Add(this.txtDaneKontaktowe);
            this.grpModyfikacja.Controls.Add(this.txtNazwisko);
            this.grpModyfikacja.Controls.Add(this.txtImie);
            this.grpModyfikacja.Location = new System.Drawing.Point(12, 314);
            this.grpModyfikacja.Name = "grpModyfikacja";
            this.grpModyfikacja.Size = new System.Drawing.Size(693, 114);
            this.grpModyfikacja.TabIndex = 1;
            this.grpModyfikacja.TabStop = false;
            this.grpModyfikacja.Text = "Dane do modyfikacji:";
            // 
            // btnModyfikuj
            // 
            this.btnModyfikuj.Location = new System.Drawing.Point(588, 58);
            this.btnModyfikuj.Name = "btnModyfikuj";
            this.btnModyfikuj.Size = new System.Drawing.Size(75, 23);
            this.btnModyfikuj.TabIndex = 6;
            this.btnModyfikuj.Text = "Modyfikuj";
            this.btnModyfikuj.UseVisualStyleBackColor = true;
            this.btnModyfikuj.Click += new System.EventHandler(this.btnModyfikuj_Click);
            // 
            // lblDaneKontaktowe
            // 
            this.lblDaneKontaktowe.AutoSize = true;
            this.lblDaneKontaktowe.Location = new System.Drawing.Point(341, 36);
            this.lblDaneKontaktowe.Name = "lblDaneKontaktowe";
            this.lblDaneKontaktowe.Size = new System.Drawing.Size(95, 13);
            this.lblDaneKontaktowe.TabIndex = 5;
            this.lblDaneKontaktowe.Text = "Dane kontaktowe:";
            // 
            // lblNazwisko
            // 
            this.lblNazwisko.AutoSize = true;
            this.lblNazwisko.Location = new System.Drawing.Point(146, 36);
            this.lblNazwisko.Name = "lblNazwisko";
            this.lblNazwisko.Size = new System.Drawing.Size(56, 13);
            this.lblNazwisko.TabIndex = 4;
            this.lblNazwisko.Text = "Nazwisko:";
            // 
            // lblImie
            // 
            this.lblImie.AutoSize = true;
            this.lblImie.Location = new System.Drawing.Point(6, 36);
            this.lblImie.Name = "lblImie";
            this.lblImie.Size = new System.Drawing.Size(29, 13);
            this.lblImie.TabIndex = 3;
            this.lblImie.Text = "Imię:";
            // 
            // txtDaneKontaktowe
            // 
            this.txtDaneKontaktowe.Location = new System.Drawing.Point(344, 61);
            this.txtDaneKontaktowe.Name = "txtDaneKontaktowe";
            this.txtDaneKontaktowe.Size = new System.Drawing.Size(192, 20);
            this.txtDaneKontaktowe.TabIndex = 2;
            this.txtDaneKontaktowe.TextChanged += new System.EventHandler(this.txtDaneKontaktowe_TextChanged);
            // 
            // txtNazwisko
            // 
            this.txtNazwisko.Location = new System.Drawing.Point(149, 61);
            this.txtNazwisko.Name = "txtNazwisko";
            this.txtNazwisko.Size = new System.Drawing.Size(159, 20);
            this.txtNazwisko.TabIndex = 1;
            this.txtNazwisko.TextChanged += new System.EventHandler(this.txtNazwisko_TextChanged);
            // 
            // txtImie
            // 
            this.txtImie.Location = new System.Drawing.Point(9, 61);
            this.txtImie.Name = "txtImie";
            this.txtImie.Size = new System.Drawing.Size(126, 20);
            this.txtImie.TabIndex = 0;
            // 
            // grpDodawanie
            // 
            this.grpDodawanie.Controls.Add(this.btnDodaj);
            this.grpDodawanie.Controls.Add(this.lblDaneKontaktoweDodawanie);
            this.grpDodawanie.Controls.Add(this.lblNazwiskoDodawanie);
            this.grpDodawanie.Controls.Add(this.lblImieDodawanie);
            this.grpDodawanie.Controls.Add(this.txtDaneKontaktoweDodawanie);
            this.grpDodawanie.Controls.Add(this.txtNazwiskoDodawanie);
            this.grpDodawanie.Controls.Add(this.txtImieDodawanie);
            this.grpDodawanie.Location = new System.Drawing.Point(12, 443);
            this.grpDodawanie.Name = "grpDodawanie";
            this.grpDodawanie.Size = new System.Drawing.Size(693, 119);
            this.grpDodawanie.TabIndex = 2;
            this.grpDodawanie.TabStop = false;
            this.grpDodawanie.Text = "Dane do dodania:";
            // 
            // btnDodaj
            // 
            this.btnDodaj.Location = new System.Drawing.Point(588, 61);
            this.btnDodaj.Name = "btnDodaj";
            this.btnDodaj.Size = new System.Drawing.Size(75, 23);
            this.btnDodaj.TabIndex = 6;
            this.btnDodaj.Text = "Dodaj";
            this.btnDodaj.UseVisualStyleBackColor = true;
            this.btnDodaj.Click += new System.EventHandler(this.btnDodaj_Click);
            // 
            // lblDaneKontaktoweDodawanie
            // 
            this.lblDaneKontaktoweDodawanie.AutoSize = true;
            this.lblDaneKontaktoweDodawanie.Location = new System.Drawing.Point(341, 36);
            this.lblDaneKontaktoweDodawanie.Name = "lblDaneKontaktoweDodawanie";
            this.lblDaneKontaktoweDodawanie.Size = new System.Drawing.Size(95, 13);
            this.lblDaneKontaktoweDodawanie.TabIndex = 5;
            this.lblDaneKontaktoweDodawanie.Text = "Dane kontaktowe:";
            // 
            // lblNazwiskoDodawanie
            // 
            this.lblNazwiskoDodawanie.AutoSize = true;
            this.lblNazwiskoDodawanie.Location = new System.Drawing.Point(146, 36);
            this.lblNazwiskoDodawanie.Name = "lblNazwiskoDodawanie";
            this.lblNazwiskoDodawanie.Size = new System.Drawing.Size(56, 13);
            this.lblNazwiskoDodawanie.TabIndex = 4;
            this.lblNazwiskoDodawanie.Text = "Nazwisko:";
            // 
            // lblImieDodawanie
            // 
            this.lblImieDodawanie.AutoSize = true;
            this.lblImieDodawanie.Location = new System.Drawing.Point(6, 36);
            this.lblImieDodawanie.Name = "lblImieDodawanie";
            this.lblImieDodawanie.Size = new System.Drawing.Size(29, 13);
            this.lblImieDodawanie.TabIndex = 3;
            this.lblImieDodawanie.Text = "Imię:";
            // 
            // txtDaneKontaktoweDodawanie
            // 
            this.txtDaneKontaktoweDodawanie.Location = new System.Drawing.Point(344, 61);
            this.txtDaneKontaktoweDodawanie.Name = "txtDaneKontaktoweDodawanie";
            this.txtDaneKontaktoweDodawanie.Size = new System.Drawing.Size(192, 20);
            this.txtDaneKontaktoweDodawanie.TabIndex = 2;
            // 
            // txtNazwiskoDodawanie
            // 
            this.txtNazwiskoDodawanie.Location = new System.Drawing.Point(149, 61);
            this.txtNazwiskoDodawanie.Name = "txtNazwiskoDodawanie";
            this.txtNazwiskoDodawanie.Size = new System.Drawing.Size(159, 20);
            this.txtNazwiskoDodawanie.TabIndex = 1;
            // 
            // txtImieDodawanie
            // 
            this.txtImieDodawanie.Location = new System.Drawing.Point(9, 61);
            this.txtImieDodawanie.Name = "txtImieDodawanie";
            this.txtImieDodawanie.Size = new System.Drawing.Size(126, 20);
            this.txtImieDodawanie.TabIndex = 0;
            // 
            // lblTabela
            // 
            this.lblTabela.AutoSize = true;
            this.lblTabela.Location = new System.Drawing.Point(18, 41);
            this.lblTabela.Name = "lblTabela";
            this.lblTabela.Size = new System.Drawing.Size(88, 13);
            this.lblTabela.TabIndex = 3;
            this.lblTabela.Text = "Zawartość tabeli:";
            // 
            // ink_info
            // 
            this.ink_info.AutoSize = true;
            this.ink_info.Location = new System.Drawing.Point(18, 9);
            this.ink_info.Name = "ink_info";
            this.ink_info.Size = new System.Drawing.Size(90, 13);
            this.ink_info.TabIndex = 4;
            this.ink_info.Text = "Numer inkasenta:";
            this.ink_info.Click += new System.EventHandler(this.ink_info_Click);
            // 
            // ink_id
            // 
            this.ink_id.AutoSize = true;
            this.ink_id.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.ink_id.ForeColor = System.Drawing.Color.Red;
            this.ink_id.Location = new System.Drawing.Point(114, 9);
            this.ink_id.Name = "ink_id";
            this.ink_id.Size = new System.Drawing.Size(0, 13);
            this.ink_id.TabIndex = 5;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(756, 757);
            this.Controls.Add(this.ink_id);
            this.Controls.Add(this.ink_info);
            this.Controls.Add(this.lblTabela);
            this.Controls.Add(this.grpDodawanie);
            this.Controls.Add(this.grpModyfikacja);
            this.Controls.Add(this.dgStudent);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "CS-B";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgStudent)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dtsTabelaTestowa)).EndInit();
            this.grpModyfikacja.ResumeLayout(false);
            this.grpModyfikacja.PerformLayout();
            this.grpDodawanie.ResumeLayout(false);
            this.grpDodawanie.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dgStudent;
        private System.Data.DataSet dtsTabelaTestowa;
        private System.Windows.Forms.GroupBox grpModyfikacja;
        private System.Windows.Forms.Label lblDaneKontaktowe;
        private System.Windows.Forms.Label lblNazwisko;
        private System.Windows.Forms.Label lblImie;
        private System.Windows.Forms.TextBox txtDaneKontaktowe;
        private System.Windows.Forms.TextBox txtNazwisko;
        private System.Windows.Forms.TextBox txtImie;
        private System.Windows.Forms.Button btnModyfikuj;
        private System.Windows.Forms.GroupBox grpDodawanie;
        private System.Windows.Forms.Button btnDodaj;
        private System.Windows.Forms.Label lblDaneKontaktoweDodawanie;
        private System.Windows.Forms.Label lblNazwiskoDodawanie;
        private System.Windows.Forms.Label lblImieDodawanie;
        private System.Windows.Forms.TextBox txtDaneKontaktoweDodawanie;
        private System.Windows.Forms.TextBox txtNazwiskoDodawanie;
        private System.Windows.Forms.TextBox txtImieDodawanie;
        private System.Windows.Forms.Label lblTabela;
        private System.Windows.Forms.Label ink_info;
        private System.Windows.Forms.Label ink_id;
    }
}

